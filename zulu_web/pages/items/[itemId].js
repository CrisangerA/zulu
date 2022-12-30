import MainLayout from '../../src/layouts/MainLayout';
import itemService from "../../src/services/item.service";
import Image from "next/image";
import { Typograpy } from "../../src/components";
import { fCurrency } from "../../src/utils/formatNumber";
import { fCondition } from "../../src/utils/formatText";
import { SCREEN_ROUTES } from '../../config/paths';

const ItemDetail = ({ data }) => {
  return (
    <MainLayout title={data.title} categories={[data.category]}>
      <div className='row'>
        <div className="col-md-8">
          <Image src={data.image} alt={data.title} width={680} height={680} />
        </div>
        <div className="col-md-4">
          <div style={{ height: '32px' }}></div>
          <Typograpy size={14} display='block'>
            {fCondition(data.condition) + ' - ' + data.rating.count + ' vendidos'}
          </Typograpy>
          <div style={{ height: '16px' }}></div>
          <Typograpy size={24}>{data.title}</Typograpy>
          <div style={{ height: '32px' }}></div>
          <Typograpy size={48} display='block'>{fCurrency(data.price)}</Typograpy>
          <div style={{ height: '32px' }}></div>
          <button style={{ minWidth: '200px'}} className='btn btn-primary'>Comprar</button>
        </div>
      </div>
      <div className='px-3'>
        <Typograpy size={28}>
          Descripción del producto
        </Typograpy>
        <div style={{ height: '32px' }}></div>
        <Typograpy size={16}>
          {data.description}
        </Typograpy>
        <div style={{ height: '32px' }}></div>
      </div>
    </MainLayout>
  )
}

export const getServerSideProps = async (context) => {
  const { itemId } = context.query;
  const data = await itemService.GetItemDetails(itemId);
  if (data.error) {
    return {
      redirect: {
        destination: SCREEN_ROUTES.root,
        permanent: false,
      }
    }
  }
  return {
    props: { data }
  }
}

export default ItemDetail;
