
interface EmailTemplateProps {
  orderId: number;
  orderLink: string;
  totalAmount: number
}

export const PayOrderTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  orderId,
  totalAmount,
  orderLink
}) => (
  <div>
    <h1>Заказ №{orderId}</h1>
    <p>Оплатите заказ на сумму: {totalAmount}, перейдите по <a href={orderLink}> этой ссылке</a> для оплаты</p>
  </div>
);