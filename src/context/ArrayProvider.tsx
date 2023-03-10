import { useState, useEffect, useContext, createContext, PropsWithChildren } from "react";
import { ArrayType, ArrayContextType } from "../types";

const ArrayContext = createContext<ArrayContextType>({} as ArrayContextType);

export const useArray = (): ArrayContextType => useContext(ArrayContext);

export const ArrayProvider = ({ children }: PropsWithChildren) => {
	const [arraySize, setArraySize] = useState<number>(20);
	const [array, setArray] = useState<ArrayType[]>([]);
	const [speed, setSpeed] = useState<number>(250);
	const [isRunning, setIsRunning] = useState<boolean>(false);

	useEffect(() => {
		console.log("Generating Array");
		const generateArray = (): ArrayType[] => {
			const arr: ArrayType[] = [];

			for (let i = 0; i < arraySize; i++) {
				const randomNumber = Math.round(Math.random() * 100);
				arr.push({ value: randomNumber, isSorted: false, isCompared: false, isMin: false });
			}

			return arr;
		};

		setArray(generateArray());
	}, [arraySize]);

	const updateArray = (array: ArrayType[]): Promise<void> => {
		return new Promise(resolve => {
			setArray([...array]);
			setTimeout(() => {
				resolve();
			}, speed);
		});
	};

	return (
		<ArrayContext.Provider
			value={{
				array,
				arraySize,
				speed,
				isRunning,
				setSpeed,
				updateArray,
				setArraySize,
				setIsRunning
			}}
		>
			{children}
		</ArrayContext.Provider>
	);
};
