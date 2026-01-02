"use client";

import { useSuspenseWorkflows } from "../hooks/use-work"

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();

    return (
        <p>
            {JSON.stringify(workflows.data,null,2)}
        </p>
    )
}