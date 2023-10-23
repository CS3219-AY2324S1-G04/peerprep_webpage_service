import { Box, BoxProps, Theme, Typography } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import Color from 'color'

export enum AvatarShape {
  square,
  circle,
  squircleSm,
  squircleMd,
  squircleLg,
}

const Avatar: React.FC<{
  src?: string
  alt?: string
  shape?: AvatarShape
  sx?: SxProps
}> = ({ src, alt = '', shape = AvatarShape.circle, sx = {} }) => {
  return src !== undefined ? (
    <ImageAvatar src={src} shape={shape} sx={sx} />
  ) : (
    <TextAvatar text={alt} shape={shape} sx={sx} />
  )
}

const BaseAvatar: React.FC<BoxProps<'img' | 'div', { shape: AvatarShape }>> = ({
  shape,
  sx,
  children,
  ...rest
}) => {
  function getBorderRadius(shape: AvatarShape): string | undefined {
    switch (shape) {
      case AvatarShape.square:
        return '0'
      case AvatarShape.circle:
        return '50%'
      case AvatarShape.squircleSm:
        return 'sm'
      case AvatarShape.squircleMd:
        return 'md'
      case AvatarShape.squircleLg:
        return 'lg'
    }
  }

  return (
    <Box
      sx={[
        styles.avatar,
        { borderRadius: getBorderRadius(shape) },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {children}
    </Box>
  )
}

const ImageAvatar: React.FC<{
  src: string
  shape: AvatarShape
  sx: SxProps
}> = ({ src, shape, sx }) => {
  return <BaseAvatar shape={shape} component="img" src={src} sx={sx} />
}

const TextAvatar: React.FC<{
  text: string
  shape: AvatarShape
  sx: SxProps
}> = ({ text, shape, sx }) => {
  const hueRange: [number, number] = [0, 360]
  const saturationRange: [number, number] = [60, 71]
  const lightnessRange: [number, number] = [50, 61]

  const lightBackgroundTextColor: Color = Color('#32383e')
  const darkBackgroundTextColor: Color = Color('#cdd7e1')

  function getBackgroundColor(
    text: string,
    hueRange: [number, number],
    saturationRange: [number, number],
    lightnessRange: [number, number],
  ) {
    const hash: number = hashString(text)

    const hue: number = hashToRange(hash, hueRange)
    const saturation: number = hashToRange(hash, saturationRange)
    const lightness: number = hashToRange(hash, lightnessRange)

    return Color.hsl(hue, saturation, lightness)
  }

  function hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; ++i) {
      hash = (hash << 5) - hash + str.charCodeAt(i)
    }

    return hash < 0 ? hash * -1 : hash
  }

  function hashToRange(hash: number, valRange: [number, number]) {
    return (hash % (valRange[1] - valRange[0])) + valRange[0]
  }

  function getInitials(text: string) {
    return text
      ?.split(new RegExp('[ _]'), 2)
      .map((s) => (s.length === 0 ? '' : s.charAt(0)))
      .reduce((prev, curr) => prev + curr)
      .slice(0, 2)
  }

  const backgroundColor: Color = getBackgroundColor(
    text,
    hueRange,
    saturationRange,
    lightnessRange,
  )

  return (
    <BaseAvatar
      shape={shape}
      sx={[
        {
          backgroundColor: backgroundColor.string(),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        sx={{
          color: backgroundColor.isLight()
            ? lightBackgroundTextColor.string()
            : darkBackgroundTextColor.string(),
        }}
      >
        {getInitials(text)}
      </Typography>
    </BaseAvatar>
  )
}

const styles = {
  avatar: ((theme: Theme) => {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 1,
      aspectRatio: 1,
      objectFit: 'cover',
      borderColor: theme.palette.neutral.outlinedBorder,
    }
  }) as SxProps,
}

export default Avatar
