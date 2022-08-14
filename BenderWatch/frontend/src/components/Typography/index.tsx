import React from 'react'
import { baseColors, fontVariables, Metrics } from '../../themes'
import { FC } from 'react'

export interface textProps {
  font?: string
  darkmode?: boolean
  children?: React.ReactNode | undefined
  variant?: 'display' | 'heading' | 'subheading' | 'title'
  disabled?: boolean
  mt?: number
  mr?: number
  mb?: number
  ml?: number
  color?: string
  style?: object
}

export const Display: FC<textProps> = ({ children, ...props }) => {
  return (
    <Typography variant='display' color={baseColors.textPrimary} {...props}>
      {children}
    </Typography>
  )
}

export const Heading: FC<textProps> = ({ children, ...props }) => {
  return (
    <Typography variant='heading' color={baseColors.textPrimary} {...props}>
      {children}
    </Typography>
  )
}

export const Subheading: FC<textProps> = ({ children, ...props }) => {
  return (
    <Typography
      variant='subheading'
      color={baseColors.textSecondary}
      {...props}
    >
      {children}
    </Typography>
  )
}

export const Title: FC<textProps> = ({ children, ...props }) => {
  return (
    <Typography variant='title' color={baseColors.primary} {...props}>
      {children}
    </Typography>
  )
}

const Typography: FC<textProps> = ({
  font,
  children,
  variant,
  disabled,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
  color = baseColors.textPrimary,
  style,
  ...props
}) => {
  const displayStyles = {
    marginTop: Metrics.base * mt || 0,
    marginRight: Metrics.base * mr || 0,
    marginBottom: Metrics.base * mb || 0,
    marginLeft: Metrics.base * ml || 0,
    color,
    ...style
  }
  switch (variant) {
    case 'display':
      return (
        <h1
          {...props}
          style={{
            fontSize: fontVariables.displaySize,
            ...displayStyles
          }}
        >
          {children}
        </h1>
      )
    case 'heading':
      return (
        <h2
          {...props}
          style={{
            fontSize: fontVariables.headingSize,
            ...displayStyles
          }}
        >
          {children}
        </h2>
      )
    case 'subheading':
      return (
        <h3
          {...props}
          style={{
            fontSize: fontVariables.subheadingSize,
            ...displayStyles
          }}
        >
          {children}
        </h3>
      )
    case 'title':
      return (
        <h3
          {...props}
          style={{
            fontSize: fontVariables.titleSize,
            ...displayStyles
          }}
        >
          {children}
        </h3>
      )
    default:
      return (
        <p
          {...props}
          style={{
            fontSize: fontVariables.bodySize,
            ...displayStyles
          }}
        >
          {children}
        </p>
      )
  }
}

export default Typography
