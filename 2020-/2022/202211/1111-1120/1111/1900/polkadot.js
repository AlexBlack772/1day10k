api.tx.balances
   .transfer(recipient, 123)
   .signAndSend(sender, ({ status, events }) => {
      if (status.isInBlock || status.isFinalized) {
         events
            // find/filter for failed events
            .filter(({ event }) =>
               api.events.system.ExtrinsicFailed.is(event)
            )
            // we know that data for system.ExtrinsicFailed is
            // (DispatchError, DispatchInfo)
            .forEach(({ event: { data: [error, info] } }) => {
               if (error.isModule) {
                  // for module errors, we have the section indexed, lookup
                  const decoded = api.registry.findMetaError(error.asModule);
                  const { docs, method, section } = decoded;

                  console.log(`${section}.${method}: ${docs.join(' ')}`);
               } else {
                  // Other, CannotLookup, BadOrigin, no extra info
                  console.log(error.toString());
               }
            });
      }
   });

//findMetaErrorとは、エラーの情報を取得するためのメソッドです。エラーの情報は、エラーの種類と、エラーの説明が含まれています。
