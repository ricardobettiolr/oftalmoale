import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Clinic } from "@/components/sections/clinic";
import { Appointment } from "@/components/sections/appointment";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <Clinic />
        <Appointment />
      </main>
      <SiteFooter />
    </>
  );
}
