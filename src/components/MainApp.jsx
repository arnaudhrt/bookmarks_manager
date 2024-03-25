import styles from "./main_app.module.css";

export default function MainApp() {
  return (
    <div className={styles.container}>
      <div className={styles.main_app_block}>
        <div className={styles.img_block}>
          <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="" />
        </div>
        <p>Github</p>
      </div>
      <div className={styles.main_app_block}>
        <div className={styles.img_block}>
          <img src="https://static.vecteezy.com/system/resources/previews/017/395/388/non_2x/pinterest-mobile-apps-icon-free-png.png" alt="" />
        </div>
        <p>Pinterest</p>
      </div>
      <div className={styles.main_app_block}>
        <div className={styles.img_block}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png" alt="" />
        </div>
        <p>LinkedIn</p>
      </div>
      <div className={styles.main_app_block}>
        <div className={styles.img_block}>
          <img src="https://play-lh.googleusercontent.com/KSuaRLiI_FlDP8cM4MzJ23ml3og5Hxb9AapaGTMZ2GgR103mvJ3AAnoOFz1yheeQBBI" alt="" />
        </div>
        <p>Gmail</p>
      </div>
      <div className={styles.main_app_block}>
        <div className={styles.img_block}>
          <img src="https://play-lh.googleusercontent.com/kCKeckQNFF9P2470x4lF9v3OW_ZZtvk1SIo9RmvJDa6WtBboqfzyefEZ2_rwWRYgM_M" alt="" />
        </div>
        <p>CoinMarketCap</p>
      </div>
      <div className={styles.main_app_block}>
        <div className={styles.img_block}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/2048px-Netflix_icon.svg.png" alt="" />
        </div>
        <p>Netflix</p>
      </div>
    </div>
  );
}
