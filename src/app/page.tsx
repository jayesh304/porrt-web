import Button from "@/components/Button";
import Image from "next/image";
import LandingImage from "../../public/Digitallifestyle.svg";

export default function Home() {
  return (
    <section className="grid">
      <div className="grid grid-cols-9 gap-16 w-full h-[36rem] p-4">
        <div className="col-span-4 grid place-items-center">
          <Image
            priority
            src={LandingImage}
            alt="SocialTree"
            width={320}
            height={320}
            className="flex "
          />
        </div>
        <div className="col-span-5 flex flex-col items-start justify-between gap-4">
          <div className="flex flex-col items-start justify-center gap-4 h-full px-4 text-white">
            <h1 className="text-4xl font-bold text-white drop-shadow-md">
              Share, Showcase, and Shine!
            </h1>
            <p className="">
              With the help of our effective bio link service, create a striking
              online portfolio, personal brand, or business profile. No matter
              if you are a freelancer, business owner, artist, or simply want to
              promote your work, our platform offers a beautiful way to easily
              manage and distribute various links. Make a bold statement and
              leave a lasting impression by including just one link to your
              extensive web presence.
            </p>

            <div className="flex gap-3">
              <Button CSS="px-5 text-sm py-2" Link="/auth" IsPrimary={true}>
                Get Started! {"->"}
              </Button>
            </div>
          </div>
          {/* <!-- <div className="w-full grid grid-cols-3">
				<div className="grid place-content-center">
					<h2 className="mx-auto text-xl font-bold">12321+</h2>
					<p>Links generated</p>
				</div>
				<div className="grid place-content-center">
					<h2 className="mx-auto text-xl font-bold">12321+</h2>
					<p>Links generated</p>
				</div>
				<div className="grid place-content-center">
					<h2 className="mx-auto text-xl font-bold">12321+</h2>
					<p>Links generated</p>
				</div>
			</div> --> */}
        </div>
      </div>
    </section>
  );
}
