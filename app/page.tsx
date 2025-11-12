
import { Button } from "@/components/ui/button";
import "./globals.css";
import Link from "next/link";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowRight } from "lucide-react";
import ThemedImage from "@/components/hero-image";
import { ShineBorder } from "@/components/ui/shine-border";
import { HoverCardAccount } from "@/components/account-card";

export default function Home() {
  return (

    <div className="container px-4 mx-auto min-h-screen bg-300 flex flex-col gap-4 items-center pt-20 relative">
      <div
        className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <TypingAnimation delay={1000} className="leading-5">✨ WELCOME PROGRAMMER!</TypingAnimation>
        </AnimatedShinyText>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-xl md:text-4xl flex flex-col gap-1 font-bold text-center">
          <BlurFade duration={0.8} direction="up" inView>
            LAUNCH AND RUN YOUR
          </BlurFade>
          <BlurFade duration={0.8} direction="up" delay={0.25} inView>
            CHALLENGES WITH ORACLE
          </BlurFade>
        </h1>
        <BlurFade duration={0.8} direction="up" delay={0.5} inView>
          <h4 className="text-xs md:text-sm text-center uppercase">
            Master the art of SQL through real-world challenges that test your logic speed and problem-solving<br></br> skills
            Turn every query into a victory
          </h4>
        </BlurFade>
      </div>
      <BlurFade duration={0.8} direction="up" delay={0.75} inView className="flex gap-2 items-center">
        <Button asChild>
          <Link href="/challenges">
            START CHALLENGES <ArrowRight />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link target="blank" href="https://github.com/6mdx/sql_challenge">
            <svg className="fill-foreground" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            Give us a star
          </Link>
        </Button>
      </BlurFade>

      <div className="flex flex-col items-center my-8">
        <BlurFade duration={0.8} direction="up" delay={1} className="relative rounded-lg">
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
          <ThemedImage
            className="w-full max-w-[75rem] rounded-lg shadow-lg border"
          />
        </BlurFade>
      </div>

      <div className="flex gap-1 items-center">
        <span>Built by</span>
        <HoverCardAccount user={{
          name: "Abdulrahman",
          bio: "Senior CS Student | Software Engineer | Web Developer | Interested in AI and SaaS projects",
          image: "https://github.com/6mdx.png",
          github: "https://github.com/6mdx",
          x: "https://x.com/6mdx1",
          linkedIn: "https://www.linkedin.com/in/abdulrahman-al-sufyani/"
        }} />
        <span>and</span>
        <HoverCardAccount user={{
          name: "Lena",
          bio: "Informations technology 👩🏻‍💻 || Cloud Computing || Artificial Intelligence || LifeLong Learner || Believe on your self❣️🌷🪄",
          image: "https://github.com/7ileo.png",
          github: "https://github.com/7ileo",
          x: "https://x.com/1lenaa11",
          linkedIn: "https://www.linkedin.com/in/lena-faisal-2a2003381/"
        }} />
        .
      </div>
    </div>
  );
}

