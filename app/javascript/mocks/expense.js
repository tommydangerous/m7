const randomInteger = () => Math.round(Math.random() * 10000) + 1;
const randomFloat = () => Math.round(randomInteger() * 100) / 100;

export function mock(opts = {}) {
  return {
    amount: randomFloat(),
    customer_id: randomInteger(),
    date: '2017-12-25',
    description: 'Swords and guns for everyone.',
    expenses_grouping_id: randomInteger(),
    id: randomInteger(),
    qb_account_id: randomInteger(),
    qb_class_id: randomInteger(),
    vendor_id: randomInteger(),
    ...opts,
  };
}
