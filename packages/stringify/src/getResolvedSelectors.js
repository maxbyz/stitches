/** Returns selectors resolved from parent selectors and nested selectors. */
export const getResolvedSelectors = (
	/** @type {string[]} Parent selectors (e.g. `["a", "button"]`). */
	parentSelectors,
	/** @type {string[]} Nested selectors (e.g. `["&:hover", "&:focus"]`). */
	nestedSelectors,
) => (
	parentSelectors.reduce(
		(resolvedSelectors, parentSelector) => {
			resolvedSelectors.push(
				...nestedSelectors.map(
					(selector) => (
						selector.includes('&') ? selector.replace(
							/&/g,
							/[ +>|~]/.test(parentSelector) && /&.*&/.test(selector)
								? `:is(${parentSelector})`
							: parentSelector
						) : parentSelector + ' ' + selector
					)
				)
			)

			return resolvedSelectors
		},
		[]
	)
)
