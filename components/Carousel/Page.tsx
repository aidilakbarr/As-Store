import { Carousel } from "flowbite-react";
import Image from "next/image";

export default function CarouselPage() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel pauseOnHover>
        <Image
          src="/assets/image/1.jpg"
          alt="Carousel Image"
          width={800}
          height={450}
          priority
          className="grayscale hover:grayscale-0 duration-500 object-cover"
        />
        <Image
          src="/assets/image/2.jpg"
          alt="Carousel Image"
          width={800}
          height={450}
          priority
          className="grayscale hover:grayscale-0 duration-500 object-cover"
        />
        <Image
          src="/assets/image/3.jpg"
          alt="Carousel Image"
          width={800}
          height={450}
          priority
          className="grayscale hover:grayscale-0 duration-500 object-cover"
        />
        <Image
          src="/assets/image/4.jpg"
          alt="Carousel Image"
          width={800}
          height={450}
          priority
          className="grayscale hover:grayscale-0 duration-500 object-cover"
        />
      </Carousel>
    </div>
  );
}
