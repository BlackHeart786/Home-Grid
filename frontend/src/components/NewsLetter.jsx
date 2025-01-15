export default function NewsLetter() {
  return (
    <div className="w-full  bg-primary p-4">
      <div className="max-w-[1240px] mx-auto flex md:justify-between py-[40px]">
        <div className="m-2">
          <h1 className="text-[20px] md:text-[33px] font-bold  text-white">
            Want to Book with best Offer ?
          </h1>
          <span className="text-white">
            Sign up to our newsletter and stay up to date.
          </span>
        </div>

        <div className="m-2">
          <input
            type="text"
            className="p-3 mb-2 mr-3 text-slate-500 rounded-lg"
            placeholder="Email"
          />
          <button className="bg-black text-white p-3 rounded-lg w-[30%]">
            Save
          </button>
          <br />
          <p className="text-white">
            We care bout the protection of your data. Read our <br />
            <a href="" className="text-black">
              {" "}
              Privecy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
