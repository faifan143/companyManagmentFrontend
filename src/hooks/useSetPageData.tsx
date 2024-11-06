import { useRouter } from "next/navigation";

function useSetPageData<T>(path: string) {
  const router = useRouter();

  const setPageData = (route: string, data: T) => {
    const encodedData = encodeURIComponent(JSON.stringify(data));
    router.push(`${route}?data=${encodedData}`);
  };

  const handleEditClick = (dataModel: T) => {
    console.log("data model is : ", dataModel);

    setPageData(path, dataModel);
  };

  return { handleEditClick };
}

export default useSetPageData;
