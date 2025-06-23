import { fetchQueriesOfUser } from "@/actions/queries";
import { getCurrentUser } from "@/actions/users";
import { IQuery } from "@/interfaces";
import dayjs from "dayjs";
import React from "react";

async function QueriesPage() {
  const userResponse = await getCurrentUser();
  if (!userResponse.success) {
    return <div>Failed to load user data</div>;
  }

  const queriesResponse: any = await fetchQueriesOfUser(userResponse.data.id);
  if (!queriesResponse.success) {
    return <div>Failed to load queries</div>;
  }

  const queries: IQuery[] = queriesResponse.data;

  return (
    <div>
      <h1 className="text-xl font-bold">Queries</h1>
      <hr className="my-4" />
      <div>
        {queries.length === 0 ? (
          <div className="p-3 text-sm text-muted-foreground">
            No queries found
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {queries.map((query) => (
              <div
                className="p-3 bg-primary-foreground border border-accent shadow rounded-lg flex flex-col gap-2"
                key={query.id}
              >
                <h1 className="text-sm font-semibold">{query.name}</h1>
                <p className="text-sm">{query.message}</p>

                <div className="flex justify-end">
                  <span className="text-xs">
                    {dayjs(query.created_at).format("DD MMMM YYYY hh:mm A")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QueriesPage;
