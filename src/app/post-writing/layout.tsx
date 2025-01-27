
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-[1200px] flex mx-auto">{children}</div>;
}
