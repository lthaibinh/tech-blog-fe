"use client";
import { Breadcrumb } from "antd";
import { usePathname, useRouter } from "next/navigation";

function createPaths(str: string) {
  const parts = str.split("/");
  const paths = [];
  let currentPath = "";

  for (let i = 0; i < parts.length; i++) {
    if (parts[i]) {
      // Skip empty parts
      currentPath += "/" + parts[i];
      paths.push(currentPath);
    }
  }

  return paths;
}

export const MyBreadcrumb = () => {
  const pathname = usePathname();
  const router = useRouter();
  const fullpath = pathname && createPaths(pathname);
  const items = pathname?.split("/")?.map((item, index) => ({
    title: item,
    key: item + index,
    onClick: () => {
      if (fullpath && fullpath[index - 1]) router.push(fullpath[index - 1]);
    },
  }));
  // router.push()
  return (
    <Breadcrumb
      className=" [&_.ant-breadcrumb-separator]:!text-black [&_.ant-breadcrumb-link]:!text-black [&_.ant-breadcrumb-link]:!uppercase"
      style={{ margin: "16px 0" }}
      items={[
        // { title: "List", key: "list" },
        // { title: "App", key: "app" },
        ...(items || []),
      ]}
    />
  );
};
