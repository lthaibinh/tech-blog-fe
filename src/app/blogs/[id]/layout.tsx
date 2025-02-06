

export default async function RootLayout({
  children,
  params 
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  

  return (
    <div className="">
      {children}
    </div>
  );
}
