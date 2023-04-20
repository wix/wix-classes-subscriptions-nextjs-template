'use client';
import { ServiceInfoViewModel } from '@app/model/service/service.mapper';
import { useServiceFormattedPrice } from '@app/hooks/useServiceFormattedPrice';
import WixMediaImage from '@app/components/Image/WixMediaImage';

export default function ServiceListPreviewView({
  services,
}: {
  services: ServiceInfoViewModel[];
}) {
  const smClassName = (services?.length ?? 0) > 1 ? 'sm:grid-cols-2' : '';
  const mdClassName = (services?.length ?? 0) > 2 ? 'md:grid-cols-3' : '';

  return (
    <div className="max-w-full-content mx-auto px-4">
      <div
        className={`px-4 flex flex-wrap my-3 m-auto grid grid-cols-1 gap-6 ${smClassName} ${mdClassName}`}
      >
        {services?.map((service, index) => (
          <ServiceCardPreview service={service} key={service.id} />
        ))}
      </div>
    </div>
  );
}

const ServiceCardPreview = ({ service }: { service: ServiceInfoViewModel }) => {
  const formattedPrice = useServiceFormattedPrice(
    service!.payment!.paymentDetails
  );

  return (
    <div className="w-full rounded-none overflow-hidden mx-auto border-2 border-gray-c2 relative h-full min-h-[300px] text-white">
      <a href={`/service/${service.slug}`} className="font-bold text-xl">
        <WixMediaImage
          media={service.info.media.mainMedia}
          width={640}
          height={480}
        />
        <div className="pt-6 px-3 text-center hover:text-gray-300 transition-colors">
          {service.info.name}
        </div>
      </a>
      <div className="font-open-sans-condensed text-sm text-center p-3">
        <div className="hover:text-gray-300 pb-3 transition-colors">
          <a href={`/service/${service.slug}`} className="underline">
            Read More
          </a>
        </div>
        <p className="pb-3">{formattedPrice.userFormattedPrice}</p>
      </div>
    </div>
  );
};
