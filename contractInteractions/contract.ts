import Moralis from 'moralis';
import contractAddress from '../contractAddress';
import LiliansList from '../abis/LiliansList.json';

const Methods = {
  SetToDone: 'setToDone',
  SetUndone: 'setUndone',
  GetIsDone: 'getIsDone',
  AddToList: 'addToList',
  GetTask: 'getTask',
  GetLength: 'length',
};

const contractOptions = {
  contractAddress,
  abi: LiliansList.abi,
};
export const setIsDone = (taskName: string, isDone: boolean) => {
  isDone ? setUndone(taskName) : setToDone(taskName);
};
export const setToDone = async (taskName: string) => {
  await Moralis.enableWeb3();
  await Moralis.executeFunction({
    ...contractOptions,
    functionName: Methods.SetToDone,
    params: { name: taskName },
  });
};

export const setUndone = async (taskName: string) => {
  await Moralis.enableWeb3();
  await Moralis.executeFunction({
    ...contractOptions,
    functionName: Methods.SetUndone,
    params: { name: taskName },
  });
};

export const createNewTask = async (taskName: string) => {
  await Moralis.enableWeb3();
  await Moralis.executeFunction({
    ...contractOptions,
    functionName: Methods.AddToList,
    params: { name: taskName },
  });
};

export const getIsDone = async (taskName: string) => {
  const isDone = await Moralis.executeFunction({
    ...contractOptions,
    functionName: Methods.GetIsDone,
    params: { name: taskName },
  });
  return isDone;
};

export const getTask = async (taskId: number) => {
  const response = await Moralis.Web3.executeFunction({
    ...contractOptions,
    functionName: Methods.GetTask,
    params: { taskId },
  });

  return response;
};

export const getLength = async () => {
  const length = await Moralis.Web3.executeFunction({
    ...contractOptions,
    functionName: Methods.GetLength,
  });

  return length;
};
