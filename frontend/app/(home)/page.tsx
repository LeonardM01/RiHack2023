import InfoCards from "@/components/general/InfoCards";
import MonthlyChart from "@/components/general/MonthlyChart";
import ProgressSection from "@/components/general/ProgressSection";

const Home = () => {
  return (
    <main className="flex-center w-full h-full flex-col max-md:flex-col-reverse pb-14">
      <InfoCards />

      <section className="mt-20 flex-between w-full gap-x-24 gap-y-8 max-lg:flex-col overflow-hidden">
        <ProgressSection />
        <MonthlyChart />
      </section>
    </main>
  )
}

export default Home;
