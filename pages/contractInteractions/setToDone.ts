import Moralis from 'moralis';
import contractAddress from '../../contractAddress';
import LiliansList from '../../abis/LiliansList.json';

type Props = {
  taskName: string;
};
const setToDone = async (taskName: string) => {
  console.log('name is', taskName);
  const txn = await Moralis.Web3.executeFunction({
    contractAddress,
    abi: LiliansList.abi,
    functionName: 'setToDone',
    params: { name: taskName },
  });
  await txn.wait();
};

export default setToDone;
