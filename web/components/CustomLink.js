import MuiLink from '@mui/material/Link'
import clsx from 'clsx'
import NextLink from 'next/link'
import {useRouter} from 'next/router'
import * as React from 'react'
// https://github.com/mui/material-ui/blob/32fd4a3249fb1de139b17ed54bd54802b3d50f44/examples/nextjs-with-typescript/src/Link.tsx
// Add support for the sx prop for consistency with the other branches.

export const NextLinkComposed = React.forwardRef((props, ref) => {
  const {to, linkAs, replace, scroll, shallow, prefetch, locale, ...other} = props

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <a ref={ref} {...other} />
    </NextLink>
  )
})

NextLinkComposed.displayName = 'NextComposedLink'

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = React.forwardRef((props, ref) => {
  const {
    activeClassName = 'active',
    as,
    className: classNameProps,
    href,
    linkAs: linkAsProp,
    locale,
    naked,
    prefetch,
    replace,
    role, // Link don't have roles.
    scroll,
    shallow,
    ...other
  } = props

  const router = useRouter()

  const pathname = typeof href === 'string' ? href : href.pathname

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  })

  const isExternal =
    typeof href === 'string' &&
    (href.indexOf('http') === 0 ||
      href.indexOf('https') === 0 ||
      href.indexOf('mailto:') === 0 ||
      href.includes('//'))

  if (isExternal) {
    if (naked) {
      return <a className={className} href={href} ref={ref} {...other} />
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />
  }

  const linkAs = linkAsProp || as
  const nextjsProps = {to: href, linkAs, replace, scroll, shallow, prefetch, locale}

  if (naked) {
    return <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />
  }

  return (
    <MuiLink
      underline="none"
      component={NextLinkComposed}
      className={className}
      ref={ref}
      {...nextjsProps}
      {...other}
    />
  )
})

Link.displayName = 'ComposedLink'

export default Link
