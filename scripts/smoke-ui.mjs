import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, execFileSync } from "node:child_process";

// Real-browser smoke check for the local landing. No requests are submitted.
const origin = process.argv[2] || "http://127.0.0.1:3000";
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "favorit-smoke-"));
const chrome = spawn(
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  [
    "--headless=new",
    `--user-data-dir=${profile}`,
    "--remote-debugging-port=0",
    "--no-first-run",
    "--no-default-browser-check",
    "about:blank",
  ],
  { stdio: "ignore", windowsHide: true },
);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let ws;
const assert = (value, description) => {
  if (!value) throw new Error(description);
  console.log(`PASS ${description}`);
};
const guard = setTimeout(() => {
  try {
    execFileSync("taskkill", ["/PID", String(chrome.pid), "/T", "/F"], {
      stdio: "ignore",
    });
  } catch {}
  process.exit(2);
}, 90000);
try {
  let port;
  for (let index = 0; index < 100 && !port; index++) {
    await sleep(100);
    try {
      port = parseInt(
        fs.readFileSync(path.join(profile, "DevToolsActivePort"), "utf8"),
        10,
      );
    } catch {}
  }
  assert(port, "Headless Chrome started");
  const version = await (
    await fetch(`http://127.0.0.1:${port}/json/version`)
  ).json();
  ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });
  let nextId = 0;
  const pending = new Map();
  const errors = [];
  const failedRequests = [];
  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const resolve = pending.get(message.id);
      pending.delete(message.id);
      resolve?.(message);
    }
    if (message.method === "Runtime.exceptionThrown")
      errors.push(
        message.params.exceptionDetails.exception?.description ||
          message.params.exceptionDetails.text,
      );
    if (
      message.method === "Network.responseReceived" &&
      message.params.response.status >= 400
    )
      failedRequests.push(message.params.response.url);
  });
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve) => {
      const id = ++nextId;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  const {
    result: { targetId },
  } = await send("Target.createTarget", { url: "about:blank" });
  const {
    result: { sessionId },
  } = await send("Target.attachToTarget", { targetId, flatten: true });
  const call = async (method, params) => {
    const result = await send(method, params, sessionId);
    if (result.error) throw new Error(JSON.stringify(result.error));
    return result.result;
  };
  const evaluate = async (expression) => {
    const response = await call("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
      userGesture: true,
    });
    if (response.exceptionDetails)
      throw new Error(
        response.exceptionDetails.exception?.description ||
          response.exceptionDetails.text,
      );
    return response.result.value;
  };
  await call("Page.enable");
  await call("Runtime.enable");
  await call("Network.enable");
  fs.mkdirSync("shots/premium", { recursive: true });
  for (const [width, height] of [
    [1440, 900],
    [1024, 768],
    [768, 1024],
    [390, 844],
    [320, 800],
  ]) {
    await call("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600,
    });
    await call("Page.navigate", { url: origin });
    await evaluate(
      `new Promise(resolve => {const start=Date.now();const timer=setInterval(()=>{if(document.querySelector('.social-panel') && document.readyState==='complete'){clearInterval(timer);document.fonts.ready.then(resolve);}else if(Date.now()-start>10000){clearInterval(timer);resolve();}},100);})`,
    );
    await sleep(700);
    assert(
      await evaluate("document.documentElement.scrollWidth <= innerWidth"),
      `No horizontal overflow at ${width}px`,
    );
    assert(
      await evaluate('document.querySelectorAll(".trust-card").length === 4'),
      `Four trust cards at ${width}px`,
    );
    const layerButtons = '#foundation-cutaway [aria-label="Слои плитного фундамента"] button';
    assert(
      await evaluate(`document.querySelectorAll('${layerButtons}').length === 5`),
      `Five interactive foundation layers at ${width}px`,
    );
    for (let layer = 0; layer < 5; layer++) {
      const center = await evaluate(`(()=>{const button=document.querySelectorAll('${layerButtons}')[${layer}];button.scrollIntoView({block:'center',behavior:'instant'});const r=button.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
      await call("Input.dispatchMouseEvent", { type: "mousePressed", ...center, button: "left", clickCount: 1 });
      await call("Input.dispatchMouseEvent", { type: "mouseReleased", ...center, button: "left", clickCount: 1 });
      assert(
        await evaluate(`(()=>{const buttons=Array.from(document.querySelectorAll('${layerButtons}'));const button=buttons[${layer}];const details=document.getElementById(button.getAttribute('aria-controls'));return button.getAttribute('aria-pressed')==='true'&&buttons.filter(b=>b.getAttribute('aria-pressed')==='true').length===1&&details.querySelector('h3').textContent===button.querySelector('strong').textContent;})()`),
        `Layer ${layer + 1} updates its explanation at ${width}px`,
      );
    }
    for (const [buttonIndex, description] of [[1, "условный пример нарушений"], [0, "выполнение по проекту"]]) {
      await evaluate(`document.querySelectorAll('#foundation-cutaway [aria-label="Сравнение качества исполнения"] button')[${buttonIndex}].click()`);
      assert(
        await evaluate(`document.querySelector('#foundation-cutaway svg[role="group"]').getAttribute('aria-label').includes('${description}')`),
        `Comparison switches to ${description} at ${width}px`,
      );
    }
    await evaluate(`document.querySelector('#foundation-cutaway svg [role="button"]').focus()`);
    await call("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    await call("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
    assert(
      await evaluate(`document.querySelectorAll('${layerButtons}')[0].getAttribute('aria-pressed')==='true'`),
      `Diagram supports keyboard layer selection at ${width}px`,
    );
    // Keep the material-rich concrete view for visual review.
    await evaluate(`document.activeElement?.blur();document.querySelectorAll('${layerButtons}')[4].click();document.querySelector('#foundation-cutaway').scrollIntoView({block:'start',behavior:'instant'})`);
    await call("Input.dispatchMouseEvent", { type: "mouseMoved", x: 0, y: 0 });
    await sleep(250);
    const cutawayClip = await evaluate(`(()=>{const r=document.querySelector('#foundation-cutaway').getBoundingClientRect();return {x:0,y:r.y+scrollY,width:innerWidth,height:r.height,scale:1};})()`);
    const cutawayShot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: cutawayClip });
    fs.writeFileSync(`shots/premium/cutaway-${width}.png`, Buffer.from(cutawayShot.data, "base64"));
    if (width === 1440 || width === 390) {
      await evaluate(`document.querySelectorAll('#foundation-cutaway [aria-label="Сравнение качества исполнения"] button')[1].click()`);
      await sleep(250);
      const errorShot = await call("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: cutawayClip });
      fs.writeFileSync(`shots/premium/cutaway-errors-${width}.png`, Buffer.from(errorShot.data, "base64"));
      await evaluate(`document.querySelectorAll('#foundation-cutaway [aria-label="Сравнение качества исполнения"] button')[0].click()`);
    }
    const drainageLayout = await evaluate(
      `Array.from(document.querySelectorAll('.drainage-story')).map(row=>{const copy=row.querySelector('.drainage-story-copy').getBoundingClientRect();const photo=row.querySelector('.drainage-story-photo').getBoundingClientRect();return {copyX:copy.x,photoX:photo.x,copyBottom:copy.bottom,photoTop:photo.top,photoHeight:photo.height};})`,
    );
    assert(
      drainageLayout.length === 3,
      `Three distinct drainage stories at ${width}px`,
    );
    assert(
      drainageLayout.every((row, index) =>
        width > 760
          ? index % 2
            ? row.photoX < row.copyX
            : row.photoX > row.copyX
          : row.photoTop >= row.copyBottom,
      ),
      `Drainage ${width > 760 ? "alternates sides" : "stacks text before photos"} at ${width}px`,
    );
    assert(
      drainageLayout.every((row) => row.photoHeight > 100),
      `All drainage photos have reserved space at ${width}px`,
    );
    if (width === 1440 || width === 390) {
      for (let index = 0; index < 3; index++) {
        await evaluate(
          `document.querySelectorAll('.drainage-story')[${index}].scrollIntoView({block:'start',behavior:'instant'})`,
        );
        assert(
          await evaluate(
            `(()=>{const image=document.querySelectorAll('.drainage-story img')[${index}];return image.decode().then(()=>image.naturalWidth>0).catch(()=>false);})()`,
          ),
          `Drainage photo ${index + 1} loads at ${width}px`,
        );
        const imageShot = await call("Page.captureScreenshot", {
          format: "png",
        });
        fs.writeFileSync(
          `shots/premium/drainage-${width}-${index + 1}.png`,
          Buffer.from(imageShot.data, "base64"),
        );
      }
      await evaluate(
        'document.querySelector("#standards").scrollIntoView({behavior:"instant"})',
      );
      await sleep(300);
      const shot = await call("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(
        `shots/premium/trust-${width}.png`,
        Buffer.from(shot.data, "base64"),
      );
    }
  }
  await call("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await evaluate(
    'scrollTo({top:document.querySelector(".measure-scene").getBoundingClientRect().top+scrollY-innerHeight+30,behavior:"instant"})',
  );
  await sleep(150);
  const tapeBefore = await evaluate(
    'getComputedStyle(document.querySelector(".measure-tape")).clipPath',
  );
  await evaluate(
    'document.querySelector(".measure-scene").scrollIntoView({block:"center",behavior:"instant"})',
  );
  await sleep(150);
  const tapeAfter = await evaluate(
    'getComputedStyle(document.querySelector(".measure-tape")).clipPath',
  );
  assert(
    tapeBefore !== tapeAfter,
    "Measuring tape unfolds as the section scrolls",
  );
  const tapeShot = await call("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(
    "shots/premium/tape-390.png",
    Buffer.from(tapeShot.data, "base64"),
  );
  await evaluate(
    'scrollTo({top:0,behavior:"instant"});document.querySelector(".menu-button").click()',
  );
  assert(
    await evaluate(
      'document.querySelector(".menu-button").getAttribute("aria-expanded")==="true"',
    ),
    "Mobile menu opens",
  );
  await evaluate(
    'Array.from(document.querySelectorAll("#mobile-menu a")).find(link => link.hash === "#standards").click()',
  );
  assert(
    await evaluate('!document.querySelector("#mobile-menu")'),
    "Navigation closes mobile menu",
  );
  await evaluate(
    'document.querySelectorAll(".stage-controls button")[3].click()',
  );
  assert(
    await evaluate(
      'document.querySelectorAll(".stage-controls button")[3].getAttribute("aria-pressed")==="true"',
    ),
    "Manual construction stage selection",
  );
  await evaluate(
    'document.querySelector("#project").scrollIntoView({behavior:"instant"})',
  );
  assert(
    await evaluate(
      'document.querySelectorAll(".social-channel").length === 2 && !document.querySelector("#project form")',
    ),
    "Telegram and WhatsApp replace the form",
  );
  assert(
    await evaluate('!document.querySelector(".social-channel-demo[href]")'),
    "Demo contacts do not open arbitrary accounts",
  );
  await evaluate(
    'document.querySelector(".social-panel").scrollIntoView({block:"center",behavior:"instant"})',
  );
  await sleep(150);
  const socialShot = await call("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(
    "shots/premium/social-390.png",
    Buffer.from(socialShot.data, "base64"),
  );
  await evaluate(
    'document.querySelector("#foundations").scrollIntoView({block:"center",behavior:"instant"})',
  );
  await sleep(180);
  const cardEarly = await evaluate(
    'Array.from(document.querySelectorAll(".foundation-reveal")).map(card => Number(getComputedStyle(card).opacity))',
  );
  console.log("Card reveal sample:", cardEarly);
  assert(cardEarly[0] > cardEarly[3], "Foundation cards appear in sequence");
  await sleep(1200);
  assert(
    await evaluate(
      'Array.from(document.querySelectorAll(".foundation-reveal")).every(card => Number(getComputedStyle(card).opacity) > .99)',
    ),
    "All foundation cards finish appearing",
  );
  for (const width of [1440, 390]) {
    await call("Emulation.setDeviceMetricsOverride", {
      width,
      height: width === 1440 ? 900 : 844,
      deviceScaleFactor: 1,
      mobile: width < 600,
    });
    for (const phase of [0, 0.3, 0.65, 1]) {
      await evaluate(
        '(()=>{const scene=document.querySelector("#concrete");scrollTo({top:scene.getBoundingClientRect().top+scrollY+(scene.offsetHeight-innerHeight)*' +
          phase +
          ',behavior:"instant"});})()',
      );
      await sleep(180);
      const state = await evaluate(
        '({fill:parseFloat(getComputedStyle(document.querySelector(".pour-fill-window")).height),left:getComputedStyle(document.querySelector(".pour-half")).transform,top:document.querySelector(".pour-sticky").getBoundingClientRect().top})',
      );
      console.log("Concrete phase", width, phase, state);
      if (phase === 0)
        assert(
          state.fill < 1,
          "Pour starts with an empty form at " + width + "px",
        );
      if (phase === 1)
        assert(
          state.fill > 295,
          "Pour ends with a complete slab at " + width + "px",
        );
      if (phase === 0.65)
        assert(
          Math.abs(state.top) < 2,
          "Concrete stage stays pinned during pouring at " + width + "px",
        );
      const shot = await call("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(
        "shots/premium/concrete-" + width + "-" + phase + ".png",
        Buffer.from(shot.data, "base64"),
      );
    }
  }
  await call("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await call("Page.navigate", { url: origin });
  await sleep(1300);
  assert(
    await evaluate(`(()=>{const layer=document.querySelector('#foundation-cutaway svg [role="button"]');return getComputedStyle(layer).transitionDuration==='0s';})()`),
    "Reduced motion disables foundation diagram transitions",
  );
  assert(
    await evaluate(
      'getComputedStyle(document.querySelector(".measure-tape")).clipPath === "inset(0px)"',
    ),
    "Reduced motion keeps measuring tape static",
  );
  assert(
    await evaluate(
      'parseFloat(getComputedStyle(document.querySelector(".pour-fill-window")).height) >= 295',
    ),
    "Reduced motion shows the completed concrete slab",
  );
  assert(
    await evaluate(
      'getComputedStyle(document.querySelector(".pour-sticky")).position === "relative"',
    ),
    "Reduced motion removes the pinned scroll sequence",
  );
  if (errors.length) console.error("JavaScript exceptions:", errors);
  assert(!errors.length, `No JavaScript exceptions (${errors.length})`);
  assert(
    !failedRequests.length,
    `No failed resource requests (${failedRequests.length})`,
  );
} finally {
  clearTimeout(guard);
  ws?.close();
  try {
    execFileSync("taskkill", ["/PID", String(chrome.pid), "/T", "/F"], {
      stdio: "ignore",
    });
  } catch {}
}
