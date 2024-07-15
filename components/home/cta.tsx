import Link from "next/link";
import { Logo } from "../ui/logo";
import { Button } from "../ui/button";

export default function Cta() {
  return (
    <section>
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative max-w-3xl mx-auto text-center pb-12 md:pb-16 flex flex-col items-center gap-10">
            <Link href="/">
              <Logo className="w-16 h-16" />
            </Link>

            <p className="text-lg text-muted-foreground">
              Estimez et réservez votre course avec nos chauffeurs privés dès
              maintenant.
            </p>

            <Link href="/contact">
              <Button size={"lg"} className="!w-fit px-10">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
