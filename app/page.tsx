import './page.css';
import Image from 'next/image';
import {
  GalleryItem,
  galleryItems,
} from '@app/model/gallery/fitness-instructor';
import ScrollIntoView from '@app/components/ScrollIntoView/ScrollIntoView';
import testIds from '@app/utils/test-ids';

const TrainingOptionSelection = ({
  text,
  className,
  bgImageSrc,
  href,
}: {
  text: string;
  bgImageSrc: string;
  href: string;
  className?: string;
}) => (
  <a
    className={`flex-1 aspect-[4/3] relative flex justify-center ${className}`}
    href={href}
  >
    <div className={`absolute-full bg-cover ${bgImageSrc}`}></div>
    <div className="absolute-full h-full opacity-0 hover:opacity-50 bg-highlight"></div>
    <div className="flex align-middle justify-center flex-col gap-5 h-full w-full max-w-[490px]">
      <h3 className="z-10 uppercase text-3xl tracking-[.3em]">{text}</h3>
      <div className="mx-auto">
        <Image
          className="hover:brightness-0 hover:invert rotate-270"
          width={50}
          height={50}
          alt={`select ${text}`}
          src="/common/arrow-circle.png"
        />
      </div>
    </div>
  </a>
);

const AchievementItem = ({
  title,
  tagline,
}: {
  title: string;
  tagline: string;
}) => (
  <li>
    <h4 className="title mb-5">{title}</h4>
    <div className="mb-5 bg-black h-px w-28"></div>
    <p className="text-xl sm:text-2xl">{tagline}</p>
  </li>
);

const GalleryItem = ({
  item: { title, tagline, imgSrc, id },
}: {
  item: GalleryItem;
}) => (
  <li className="aspect-video relative">
    <Image src={imgSrc} alt={title} fill />
    <div className="absolute-full opacity-0 hover:opacity-70 bg-white p-8 flex flex-col justify-between text-black">
      <div className="text-center">
        <h4 className="text-2xl pt-4 pb-2">{title}</h4>
        <p className="font-open-sans-condensed">{tagline}</p>
      </div>
      <div className="flex justify-between">
        <a href="/#" className="cursor-pointer">
          <Image
            src="/common/like.svg"
            height={24}
            width={24}
            alt="like image"
          />
        </a>
        <a href="/#" className="cursor-pointer">
          <Image
            src="/common/share.svg"
            height={24}
            width={24}
            alt="share image"
          />
        </a>
      </div>
    </div>
  </li>
);

export default async function Home() {
  return (
    <div>
      <div
        className="text-center min-h-screen bg-[url('/home/fitness-background-1.jpg')] parallax-background"
        data-testid={testIds.HOME_PAGE.HEADER}
      >
        <section className="py-[355px]">
          <h1 className="tracking-widest">Joey Dixon</h1>
          <div className="pt-7">
            <div className="tracking-[.4em] text-3xl uppercase">
              Training with a World Champion
            </div>
          </div>
          <div className="pt-14 flex gap-8 justify-center">
            <a
              className="btn-secondary text-lg px-7"
              href="/classes-schedule"
              data-testid={testIds.HOME_PAGE.BOOK_CLASS_CTA}
            >
              Book Now
            </a>
            <a
              className="btn-main text-lg px-7"
              href="/plans"
              data-testid={testIds.HOME_PAGE.BOOK_PLAN_CTA}
            >
              Membership
            </a>
          </div>
        </section>
        <section className="flex flex-col sm:flex-row pt-1 pb-7 bg-gray-c1 cursor-pointer">
          <TrainingOptionSelection
            href="/training"
            text="Beginners"
            className="sm:justify-end"
            bgImageSrc="bg-[url('/home/beginners.jpg')]"
          />
          <TrainingOptionSelection
            href="/training"
            text="Professionals"
            className="sm:justify-start"
            bgImageSrc="bg-[url('/home/professionals.jpg')]"
          />
        </section>
      </div>
      <ScrollIntoView hashName="#about" offset="-90px" />
      <div className="min-h-screen bg-[url('/home/fitness-background-2.jpg')] parallax-background">
        <div className="max-w-full-content mx-auto box-content pt-2">
          <div className="max-w-[400px] pt-10 pb-2">
            <h2 className="uppercase text-7xl leading-tight py-7">
              Meet The Coach
            </h2>
            <section className="font-open-sans-condensed text-base text-stone-300 tracking-wider">
              <p className="py-3">
                {`Hi, I’m Joey Dixon and I’m a boxing coach with 15 years of boxing experience and 9 intercontinental cruiserweight titles. 
                I’ve trained many successful boxers at national and international levels. I love teaching people how to box like a pro,
                whether they are beginners or advanced fighters.
                `}
              </p>
              <p className="py-3">
                {`To me, boxing is not only a sport, but also a way of life.
                It teaches you discipline, resilience, confidence, and self-defense. It also keeps you fit, healthy, and mentally sharp.
                That’s why I created this business to share my knowledge and skills with you.`}
              </p>
              <p className="py-3">
                {`I have a friendly and supportive approach that will make you feel comfortable and motivated.
                I also have a wealth of experience and expertise that will make you learn faster and better.
                No matter what your age, level, or background, I can help you become the best boxer you can be.`}
              </p>
              <p className="py-3">
                {`If you are interested in working with me or learning more about me, please feel free to contact me or browse through my website.
                I look forward to hearing from you and helping you on your boxing journey.`}
              </p>
            </section>
            <section className="mt-5">
              <ul aria-label="Social Bar" className="flex gap-2 invert -ml-3">
                <li>
                  <a
                    href="http://www.facebook.com/wix"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      width={43}
                      height={43}
                      alt="Facebook"
                      src="https://static.wixstatic.com/media/0fdef751204647a3bbd7eaa2827ed4f9.png"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.twitter.com/wix"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      width={43}
                      height={43}
                      src="https://static.wixstatic.com/media/c7d035ba85f6486680c2facedecdcf4d.png"
                      alt="Twitter"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/wix/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      width={43}
                      height={43}
                      src="https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png"
                      alt="Instagram"
                    />
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <section className="bg-[url('/home/coacher-achievements-background.jpg')] bg-center bg-cover">
          <div className="max-w-full-content px-4 mx-auto text-black">
            <h2 className="title pt-24 pb-20 tracking-[.3em] text-center">
              My Experience
            </h2>
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-16 pb-20 px-2">
              <AchievementItem
                title="15"
                tagline="15 YEARS OF BOXING EXPERIENCE"
              />
              <AchievementItem
                title="3"
                tagline="3 TIMES WBA INTERCONTINENTAL CRUISERWEIGHT"
              />
              <AchievementItem
                title="4"
                tagline="4 TIMES WBC INTERCONTINENTAL CRUISERWEIGHT"
              />
              <AchievementItem
                title="2"
                tagline="2 TIMES IBF INTERCONTINENTAL CRUISERWEIGHT"
              />
            </ul>
          </div>
        </section>
        <section className="bg-gray-c2">
          <div className="max-w-full-content px-4 mx-auto py-20 flex flex-col gap-10 items-center">
            <h3 className="text-3xl uppercase tracking-[.4em] pt-7">
              Start Training Today
            </h3>
            <a
              className="btn-secondary px-10 text-lg px-7"
              href="/classes-schedule"
            >
              Book a Session
            </a>
          </div>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <GalleryItem item={item} key={item.id} />
          ))}
        </section>
      </div>
      <ScrollIntoView hashName="#studio" offset="-90px" />
      <div className="text-center py-24 bg-[url('/home/fitness-background-3.jpg')] parallax-background">
        <div className="mx-auto max-w-md px-2">
          <h2 className="title tracking-widest">THE STUDIO</h2>
          <div className="pt-7 font-open-sans-condensed text-lg text-stone-300">
            {`We train in a modern and spacious facility, conveniently located in the heart of San Francisco.
            We have the equipment, facilities and expertise to take on clients of all ages and experience levels. Come by and check us out!`}
          </div>
          <section className="text-center uppercase pt-24 text-stone-200">
            <h4 className="text-3xl tracking-[.4em]">Address</h4>
            <div className="pt-6">
              <div className="text-2xl">500 Terry A Francois Blvd</div>
              <div className="text-lg">San Francisco, CA 94158, USA</div>
            </div>
          </section>
          <section className="text-center uppercase pt-20 text-stone-200">
            <h4 className="text-3xl tracking-[.4em]">Hours</h4>
            <div className="text-2xl pt-6">
              <div>Monday - Friday</div>
              <div>6:30AM - 7:00PM</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
