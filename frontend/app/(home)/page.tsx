import MonthlyChart from "@/components/general/MonthlyChart";
import ProgressSection from "@/components/general/ProgressSection";

const Home = () => {
  return (
    <main className="flex-center w-full h-full">
      <section className="mt-20 flex-between w-full gap-x-24 gap-y-8 max-md:flex-col">
        <MonthlyChart />

        <ProgressSection />
      </section>
    </main>
  )
}

export default Home;
