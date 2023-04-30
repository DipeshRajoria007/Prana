import styles from "../styles";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Benifits from "../Components/Benifits";

const Home = () => {
  return (
    <div className="w-full overflow-hidden text-darkBg">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart} `}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
          <Benifits />
        </div>
      </div>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>other sections</div>
      </div>
    </div>
  );
};

export default Home;
