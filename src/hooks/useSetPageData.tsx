import RouteWrapper from "@/components/common/RouteWrapper";

function useSetPageData<T>(path: string) {
  const setPageData = (data: T) => {
    const key = "pageData"; // Unique key for storage
    sessionStorage.setItem(key, JSON.stringify(data)); // Store the data
  };

  const NavigateButton = ({
    data,
    children,
    className,
  }: {
    data: T;
    children: React.ReactNode;
    className?: string;
  }) => (
    <RouteWrapper
      href={`${path}?key=pageData`}
      onClick={() => setPageData(data)}
      className={className}
    >
      {children}
    </RouteWrapper>
  );

  return { NavigateButton };
}

export default useSetPageData;
