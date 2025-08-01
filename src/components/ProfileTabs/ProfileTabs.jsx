import s from "./ProfileTabs.module.css";

export const ProfileTabs = ({ selectedTab, onSelectTab }) => {
  const tabs = ["My Articles", "Saved Articles"];

  return (
    <div className={s.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${s.tab} ${selectedTab === tab ? s.active : ""}`}
          onClick={() => onSelectTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
