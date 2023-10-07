import InfoCards from "@/components/general/InfoCards";
import MonthlyChart from "@/components/general/MonthlyChart";
import ProgressSection from "@/components/general/ProgressSection";

const Home = () => {
  return (
    <main className="flex-center w-full h-full flex-col">
      <InfoCards />
      <section className="mt-20 flex-between w-full gap-x-24 gap-y-8 max-lg:flex-col overflow-hidden pb-14">
        <MonthlyChart />

        <ProgressSection />
      </section>
    </main>
  )
}

export default Home;
