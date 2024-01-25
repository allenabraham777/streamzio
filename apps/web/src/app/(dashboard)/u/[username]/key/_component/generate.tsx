'use client';
import React, { useRef, useTransition } from 'react';
import { toast } from 'sonner';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button
} from '@streamzio/ui';

import { onGenerateKey } from '@/actions/stream-key';
import { FaCheckCircle } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';

const Generate = () => {
    const [isPending, setTransition] = useTransition();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const handleGenerate = () => {
        setTransition(() => {
            onGenerateKey()
                .then(() => {
                    toast.success('Key generated', {
                        position: 'top-center',
                        icon: <FaCheckCircle className="w-4 h-4 text-green-500" />,
                        description: `Generated stream key`
                    });
                })
                .catch((error) => {
                    console.error(error);

                    toast.error('Error', {
                        position: 'top-center',
                        icon: <IoCloseCircle className="w-4 h-4 text-red-600" />,
                        description: 'Something went wrong!'
                    });
                });
        });
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger disabled={isPending} ref={buttonRef} asChild>
                <Button>Generate Key</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will reset all active streams using the current connection.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleGenerate}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Generate;
