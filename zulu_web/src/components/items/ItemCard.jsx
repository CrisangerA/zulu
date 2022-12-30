import {Typograpy} from "../index";
import Image from "next/image";
import Link from "next/link";
import { SCREEN_ROUTES } from "../../../config/paths";
import {fCurrency} from '../../utils/formatNumber';

export default function ItemCard({ item, length, index }) {
  return (
    <>
      <Link href={SCREEN_ROUTES.items.detail(item.id)}>
        <div className='container' style={{ cursor: 'pointer' }}>
          <div className='row'>
            <div className='col-md-2'>
              <Image src={item.image} alt={item.title} width={180} height={180} />
            </div>
            <div className='col-md-8'>
              <Typograpy size={24}>
                {fCurrency(item.price)}
              </Typograpy>
              <div style={{ height: '32px' }}></div>
              <Typograpy size={18}>
                {item.title}
              </Typograpy>
            </div>
            <div className='col-md-1'>
              <Typograpy size={12}>
                {item.rating.rate}
              </Typograpy>
            </div>
            <div className='col-md-1'>
            </div>
          </div>
        </div>
      </Link>
      {(length -1 ) !== index && <hr style={{ color: '#333333', marginTop: '16px', marginBottom: '16px' }} />}      
    </>
  )
}
