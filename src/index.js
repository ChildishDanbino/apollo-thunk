export default function apolloThunk(graphQlClient) {
	return ({ dispatch, getState }) => {
		return next => (action) => {
			if (typeof action === 'function') {
				// thunk
				return action(dispatch, getState);
			}

			const { mutation, query, types, variables, fetchPolicy = 'cache-first', ...rest } = action;

			if (!query && !mutation) {
				//no query, no mutation, nothing to do here
				return next(action);
			}

			const [REQUEST, SUCCESS, FAILURE] = types;

			next({ ...rest, type: REQUEST });

			// graphql mutations
			if (mutation) {
				return graphQlClient.mutate({ mutation, variables }).then(
					result => next({ ...rest, ...result, type: SUCCESS }),
				error => next({ ...rest, error, type: FAILURE })
			);
			}

			// graphql queries
			return graphQlClient.query({ query, variables, fetchPolicy }).then(
				result => next({ ...rest, ...result, type: SUCCESS }),
			error => next({ ...rest, error, type: FAILURE })
		);
		};
	};
}
