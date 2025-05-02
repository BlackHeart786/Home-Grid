export default function Plans() {
  return (
    <div className="py-[100px] px-3">
      <div className="max-w-[1240px] mx-auto md:grid grid-cols-3  gap-7">
        <div className="shadow-2xl h-[500px] flex flex-col my-4 p-4 rounded-[40px] hover:scale-105 duration-500">
          <h2 className="text-[12px] md:text-2xl font-bold  text-black pt-20 text-center py-8">
            FREE BOOKING
          </h2>
          <p className="text-center text-4xl font-bold text-red-600">FREE</p>
          <div className="text-center font-bold">
            <p className="py-2 border-b mx-8 mt-8 text-black">
              Create your fresh Account
            </p>
            <p className="py-2 border-b mx-8 text-black">
              Booking your dream PG or ROOM{" "}
            </p>
            <p className="py-2 border-b mx-8 text-black">
              After one month you have pay for use this site{" "}
            </p>
          </div>
          <button className="bg-[#7d30efcd] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white">
            Start Trial
          </button>
        </div>
        <div className="shadow-2xl h-[500px] flex flex-col my-4 p-4 bg-slate-100 rounded-[40px] hover:scale-105 duration-500">
          <h2 className="text-[12px] md:text-2xl font-bold  text-black pt-20 text-center py-8">
            BOOKING NOW
          </h2>
          <p className="text-center text-4xl font-bold text-black">$19</p>
          <div className="text-center font-bold">
            <p className="py-2 border-b mx-8 mt-8 text-black">
              Do subsciption with ony $19
            </p>
            <p className="py-2 border-b mx-8 text-black">
              HurryUP it's limited for 5h only
            </p>
            <p className="py-2 border-b mx-8 text-black">
              for better experiance and suggession of your dream PG or ROOM
            </p>
          </div>
          <button className="bg-[#0d5128] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white">
            Start here
          </button>
        </div>
        <div className="shadow-2xl h-[500px] flex flex-col my-4 p-4 rounded-[40px] hover:scale-105 duration-500">
          <h2 className="text-[12px] md:text-2xl font-bold  text-black pt-20 text-center py-8">
            BOOKING NOW
          </h2>
          <p className="text-center text-4xl font-bold text-black">$30</p>
          <div className="text-center font-bold">
            <p className="py-2 border-b mx-8 mt-8 text-black">Subscribe now</p>
            <p className="py-2 border-b mx-8 text-black">
              {" "}
              for better suggession{" "}
            </p>
            <p className="py-2 border-b mx-8 text-black">
              It's best Offer for you to find your dream ROOM with your Choice{" "}
            </p>
          </div>
          <button className="bg-[#f5a03e] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white">
            Start here
          </button>
        </div>
      </div>
    </div>
  );
}
