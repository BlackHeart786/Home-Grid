import { useState, useEffect } from "react";
import SkeletonLoader from "../SkeletonLoader";

const ListGallery = () => {
  const items = [
    {
      id: 1,
      image:
        "https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1103i215%2Fpnjaazd09nyy4cy9e5yv47nb00i215&option=N&h=472&permitphotoenlargement=false",
      title: "Park circus",
    },
    {
      id: 2,
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-6076545/original/a1d3fe69-57d3-4666-9cee-85a45dbfb18d.jpeg?im_w=720&im_format=avif",
      title: "Howrah",
    },
    {
      id: 3,
      image:
        "https://www.mumbaiexpathousing.com/propertyimg/Mumbai-Expats-Housing-883-3.jpeg",
      title: "Kalighat",
    },
    {
      id: 4,
      image:
        "https://ik.imagekit.io/flashaway/thumb_large_8c42f35c-0ca5-42a1-a043-52481fe8c87e.jpg",
      title: "Dhakuria",
    },
    {
      id: 5,
      image:
        "https://images.nobroker.in/images/8a9f8f83936447a3019364804c3e0a0b/8a9f8f83936447a3019364804c3e0a0b_81200_282957_medium.jpg",
      title: "Ballygunge",
    },
    {
      id: 6,
      image: "https://apollo.olx.in/v1/files/13pbg86yr9r83-IN/image;s=272x0",
      title: "Dharmatala",
    },
    {
      id: 7,
      image:
        "https://imagecdn.99acres.com/media1/24944/9/498889911M-1732009806066.jpg",
      title: "Damdam",
    },
    {
      id: 8,
      image:
        "https://www.mumbaiexpathousing.com/propertyimg/Mumbai-Expats-Housing-864-12.jpeg",
      title: "Karunamoye",
    },
    {
      id: 9,
      image:
        "https://imagecdn.99acres.com/media1/26931/10/538630669M-1734504006111.jpg",
      title: "Mahisbathan",
    },
    {
      id: 10,
      image:
        "https://bsmedia.business-standard.com/_media/bs/img/article/2023-07/25/full/1690302846-8749.jpg?im=FeatureCrop,size=(826,465)",
      title: "New town",
    },
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="bg-lightGray">
      {/* Header Section */}
      <header className="text-white text-center pt-20">
        <h1 className="text-4xl font-bold">Available For Rent</h1>
      </header>

      {/* Image Gallery */}
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-32">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="relative group">
                <SkeletonLoader />
              </div>
            ))
          : // Show actual items when not loading
            items.map((item) => (
              <div key={item.id} className="relative group">
                <a href={item.image}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover rounded-lg transition-transform transform group-hover:scale-105"
                  />
                </a>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center rounded-b-lg">
                  <span className="text-[#f1dabf] font-semibold text-lg">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ListGallery;
