import Image from "next/image";

// Replace null with the company's verified URLs when contacts are supplied.
const channels: {
  name: string;
  icon: string;
  description: string;
  url: string | null;
  className: string;
}[] = [
  {
    name: "Telegram",
    icon: "/icons/telegram.svg",
    description: "Проект, вопросы и фотографии участка",
    url: null,
    className: "telegram",
  },
  {
    name: "WhatsApp",
    icon: "/icons/whatsapp.svg",
    description: "Обсудить фундамент или дренаж",
    url: null,
    className: "whatsapp",
  },
];

export function SocialContacts() {
  return (
    <div className="social-panel">
      <div className="social-panel-heading">
        <span className="eyebrow">На связи с вашим проектом</span>
        <span aria-hidden="true">↗</span>
      </div>
      <h3>
        Начнём
        <br />с разговора.
      </h3>
      <p className="social-intro">
        Выберите удобный мессенджер.
        <br />
        Расскажите о задаче и приложите проект, если он уже есть.
      </p>
      <div className="social-channels">
        {channels.map((channel) => {
          const content = (
            <>
              <span className="social-icon">
                <Image src={channel.icon} alt="" width={36} height={36} />
              </span>
              <span className="social-channel-copy">
                <strong>{channel.name}</strong>
                <span>{channel.description}</span>
              </span>
              <span className="social-channel-arrow" aria-hidden="true">
                ↗
              </span>
            </>
          );
          return channel.url ? (
            <a
              key={channel.name}
              className={`social-channel ${channel.className}`}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          ) : (
            <div
              key={channel.name}
              className={`social-channel ${channel.className} social-channel-demo`}
              aria-label={`${channel.name}: демонстрационный контакт`}
            >
              {content}
            </div>
          );
        })}
      </div>
      <p className="social-demo-note">
        <span aria-hidden="true">+</span> Демонстрационный блок. Контакты
        компании появятся здесь.
      </p>
    </div>
  );
}
