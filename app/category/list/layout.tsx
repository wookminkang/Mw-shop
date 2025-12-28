import { ListSideBar } from "@/components/layout/listSideBar"


export default function categoryLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="flex pl-[60px] pr-[50px] pb-100">
      <ListSideBar />
      <div className="test">
        {children}
      </div>
    </div>
  )
}