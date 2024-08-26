'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../button';
import { ComponentProps } from 'react';

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

const SubmitButton = ({ children, ...props } : Props) => {
	const { pending, action } = useFormStatus();
	const isPending = pending && action === props.formAction;
	return (
		<Button
			type="submit"
			className="w-full flex justify-center items-center"
			{...props}
		>
			{ isPending ? "Cargando..." : children}
		</Button>
	);
};

export default SubmitButton;