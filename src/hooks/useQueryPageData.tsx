import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FieldValues, UseFormReset } from "react-hook-form";

function useQueryData<T extends FieldValues>(
  reset: UseFormReset<T>,
  paramName: string = "data"
) {
  const searchParams = useSearchParams();
  const [queryData, setQueryData] = useState<T | null>(null);

  useEffect(() => {
    const dataParam = searchParams.get(paramName);
    if (dataParam) {
      const parsedData = JSON.parse(decodeURIComponent(dataParam)) as T;
      setQueryData(parsedData);
      reset(parsedData);
    } else {
      reset();
    }
  }, [reset, searchParams, paramName]);

  return queryData;
}

export default useQueryData;
