export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-12 text-xs text-gray-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-black mb-4">CUSTOMER SERVICE</h3>
            <p className="mb-1">1644-0000</p>
            <p>운영시간: 10:00 - 17:00</p>
            <p>점심시간: 12:30 - 13:30</p>
          </div>
          <div>
             <h3 className="font-bold text-black mb-4">ABOUT US</h3>
             <p>회사소개</p>
             <p>인재채용</p>
             <p>이용약관</p>
          </div>
        </div>
        <div className="border-t pt-8">
          <p>© 2025 Mw-Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}