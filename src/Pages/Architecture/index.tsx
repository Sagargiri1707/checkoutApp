const Tick = () => (
  <svg
    className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
  </svg>
);
const dataFlow = [
  { name: 'You load the page', icon: 0 },
  { name: 'App gets rendered and api call is being made', icon: 0 },
  {
    name: 'Data is fetched from the Api via actions and stored in context via reducer',
    icon: 0,
  },
  {
    name: 'Home Page then renders the cart component ,based on the data from context, where you can add/remove/select items to purchase',
    icon: 0,
  },
  { name: 'Button gets disabled / enabled based on items you select', icon: 0 },
  {
    name: 'On further steps you have option to select address or add a new address',
    icon: 0,
  },
  {
    name: 'You may add a new address which will post be shown in the adress list',
    icon: 0,
  },
  {
    name: 'On next step you will have an option to check the price and adress and submit it',
    icon: 0,
  },
  {
    name: 'On Api success , a success toast will be shown with success message and cart becomes empty',
    icon: 0,
  },
  {
    name: 'On failure you will be at the same page and left with an option to retry',
    icon: 0,
  },
  { name: 'Thats the end :)', icon: 0 },
];
const partners= [
  "Frontend partner: React JS",
  "Styling partner: Tailwind css",
  "Testing partner: React testing library",
  "Testing partner: React testing library",
  "Deployment partner : Vercel"
]
function Arch() {
  return (
    <div className="container mx-auto w-128 ">
      <div className="mt-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Partners in the project
        </h3>
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          {
            partners.map(partner=>(
              <li className="flex items-center">
              <Tick />
             {partner}
            </li>
            ))
          }
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Data Flow
        </h3>
        <div className="flex flex-col space-y-4 p-4">
          {dataFlow.map((data, id) => {
            return (
              <div className="flex font-sm items-center">
                <span className="text-green-500 mr-2">
                  {data.icon === 0 ? '✓' : '•'}
                </span>
                <span className="font-bold">{data.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          HLD Diagram
        </h3>
        <img
          src="https://rukminim1.flixcart.com/www/800/800/promos/26/01/2024/04b6c585-1a76-475a-a2ee-34cfe0806242.png?q=100"
          alt="design diagrams"
        />
      </div>
      <div className="mt-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Data Flow in the project
        </h3>
        <img
          src="https://rukminim1.flixcart.com/www/1000/1000/promos/26/01/2024/c43eae7a-3773-4361-9e2f-fb7fbc3be3a9.png?q=100"
          alt="data flow"
        />
      </div>
    </div>
  );
}

export default Arch;
