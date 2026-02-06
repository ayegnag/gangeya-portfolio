export type ExcalidrawElementType = 'rectangle' | 'text' | 'ellipse' | 'diamond'

export interface BaseElementProps {
  x: number
  y: number
  color?: string
}

export interface RectangleProps extends BaseElementProps {
  width?: number
  height?: number
}

export interface TextProps extends BaseElementProps {
  text: string
  fontSize?: number
  width?: number
  height?: number
}

export interface EllipseProps extends BaseElementProps {
  width?: number
  height?: number
}

export type ElementProps = RectangleProps | TextProps | EllipseProps

export function createExcalidrawElement<T extends ExcalidrawElementType>(
  type: T,
  props: ElementProps
) {
  const commonProps = {
    angle: 0,
    opacity: 100,
    groupIds: [] as string[],
    frameId: null,
    seed: Math.floor(Math.random() * 100000),
    version: 1,
    versionNonce: Math.floor(Math.random() * 100000),
    isDeleted: false,
    boundElements: null,
    updated: Date.now(),
    link: null,
    locked: false,
  }

  const id = `${Date.now()}-${type}`

  switch (type) {
    case 'rectangle':
      return {
        id,
        type: 'rectangle',
        x: props.x,
        y: props.y,
        width: (props as RectangleProps).width ?? 140,
        height: (props as RectangleProps).height ?? 90,
        strokeColor: props.color ?? '#000000',
        backgroundColor: props.color ? `${props.color}22` : '#00000022',
        fillStyle: 'solid',
        strokeWidth: 2,
        strokeStyle: 'solid',
        roughness: 1,
        roundness: { type: 3, value: 8 },
        ...commonProps,
      }

    case 'text':
      return {
        id,
        type: 'text',
        x: props.x,
        y: props.y,
        width: (props as TextProps).width ?? 120,
        height: (props as TextProps).height ?? 40,
        text: (props as TextProps).text,
        fontSize: (props as TextProps).fontSize ?? 16,
        fontFamily: 1,
        textAlign: 'center',
        verticalAlign: 'middle',
        baseline: 14,
        strokeColor: props.color ?? '#000000',
        backgroundColor: 'transparent',
        fillStyle: 'solid',
        strokeWidth: 2,
        strokeStyle: 'solid',
        roughness: 0,
        roundness: null,
        containerId: null,
        originalText: (props as TextProps).text,
        lineHeight: 1.25,
        ...commonProps,
      }

    case 'ellipse':
      return {
        id,
        type: 'ellipse',
        x: props.x,
        y: props.y,
        width: (props as EllipseProps).width ?? 100,
        height: (props as EllipseProps).height ?? 100,
        strokeColor: props.color ?? '#000000',
        backgroundColor: props.color ? `${props.color}22` : '#00000022',
        fillStyle: 'solid',
        strokeWidth: 2,
        strokeStyle: 'solid',
        roughness: 1,
        roundness: { type: 3, value: 8 },
        ...commonProps,
      }

    default:
      throw new Error(`Unsupported element type: ${type}`)
  }
}