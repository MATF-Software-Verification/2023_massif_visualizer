import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSourceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate(`/stats`, { state: { sourceFile: e.target.files?.[0] } });
  };

  const handleMassifUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate(`/stats`, { state: { massifFiles: e.target.files } });
  };

  return (
    <div className="flex flex-col gap-6 h-screen w-screen justify-center items-center">
      <div className="text-5xl">Home</div>
      <div className="w-full flex flex-row justify-around">
        <label
          htmlFor="sourcecode"
          className="cursor-pointer p-4 text-white rounded-xl text-3xl bg-blue-600 "
        >
          Source code
          <input id="sourcecode" type="file" className="hidden" onChange={handleSourceUpload} />
        </label>
        <label
          htmlFor="massif"
          className="cursor-pointer p-4 text-white rounded-xl text-3xl bg-blue-600 "
        >
          Massif file(s)
          <input
            id="massif"
            type="file"
            multiple={true}
            className="hidden"
            onChange={handleMassifUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default Home;
