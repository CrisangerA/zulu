export default function ItemPagination({ activePage, handleChangePage, pages }) {
  return (
    <div className='d-flex justify-content-center'>
      <nav>
        <ul className='pagination'>
          {
            Array.from({ length: pages }, (_, id) => id)
              .map((item, i) =>
                <li key={'index-' + i} className="page-item">
                  <p className={`page-link ${item === activePage && 'active'}`} href="#" onClick={() => handleChangePage(item)}>
                    {item + 1}
                  </p>
                </li>
              )
          }
        </ul>
      </nav>
    </div>
  )
}
