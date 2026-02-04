
import { useState, useCallback, lazy, Suspense } from 'react'
import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
    PanelLeftClose,
    PanelLeftOpen,
    Download,
    Upload,
    Trash2,
    Save,
    FolderOpen
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTheme } from "next-themes";
import { CLOUD_SERVICES } from '../data/shapes';

// Lazy load Excalidraw to avoid SSR/import issues
const Excalidraw = lazy(() =>
    import('@excalidraw/excalidraw').then((module) => ({
        default: module.Excalidraw,
    }))
)

export default function Blackboard() {
    const { theme: appTheme } = useTheme()
    const theme = appTheme === 'light' ? 'light' : 'dark'
    const [isPanelOpen, setIsPanelOpen] = useState(true)
    const [markdownText, setMarkdownText] = useState(`# Architecture Notes

## Overview
Start documenting your architecture here...

## Components
- Component 1
- Component 2

## Data Flow
1. Step 1
2. Step 2

## Notes
Add your markdown notes with **bold**, *italic*, and \`code\` formatting.
`)
    const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)
    const [selectedService, setSelectedService] = useState<string | null>(null)

    // Get theme from document
    //   const theme = typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'

    // Add a cloud service element to the canvas
    const addCloudService = useCallback((serviceName: string, icon: string, color: string) => {
        if (!excalidrawAPI) return

        const appState = excalidrawAPI.getAppState()
        const elements = excalidrawAPI.getSceneElements()

        // Calculate position (center of viewport with random offset)
        const x = (appState.scrollX || 0) + 300 + Math.random() * 200
        const y = (appState.scrollY || 0) + 200 + Math.random() * 200

        // Create rectangle element
        const rectangleId = `${Date.now()}-rect`
        const rectangleElement = {
            id: rectangleId,
            type: 'rectangle',
            x,
            y,
            width: 140,
            height: 90,
            angle: 0,
            strokeColor: color,
            backgroundColor: `${color}22`,
            fillStyle: 'solid',
            strokeWidth: 2,
            strokeStyle: 'solid',
            roughness: 1,
            opacity: 100,
            groupIds: [],
            frameId: null,
            roundness: { type: 3, value: 8 },
            seed: Math.floor(Math.random() * 100000),
            version: 1,
            versionNonce: Math.floor(Math.random() * 100000),
            isDeleted: false,
            boundElements: null,
            updated: Date.now(),
            link: null,
            locked: false,
        }

        // Create text element
        const textId = `${Date.now()}-text`
        const textElement = {
            id: textId,
            type: 'text',
            x: x + 10,
            y: y + 25,
            width: 120,
            height: 40,
            angle: 0,
            strokeColor: color,
            backgroundColor: 'transparent',
            fillStyle: 'solid',
            strokeWidth: 2,
            strokeStyle: 'solid',
            roughness: 0,
            opacity: 100,
            groupIds: [],
            frameId: null,
            roundness: null,
            seed: Math.floor(Math.random() * 100000),
            version: 1,
            versionNonce: Math.floor(Math.random() * 100000),
            isDeleted: false,
            boundElements: null,
            updated: Date.now(),
            link: null,
            locked: false,
            text: `${icon}\n${serviceName}`,
            fontSize: 16,
            fontFamily: 1,
            textAlign: 'center',
            verticalAlign: 'middle',
            baseline: 14,
            containerId: null,
            originalText: `${icon}\n${serviceName}`,
            lineHeight: 1.25,
        }

        // Update scene with new elements
        excalidrawAPI.updateScene({
            elements: [...elements, rectangleElement, textElement] as any,
        })

        setSelectedService(serviceName)
    }, [excalidrawAPI])

    // Save to localStorage
    const saveToLocal = useCallback(() => {
        if (!excalidrawAPI) return

        try {
            const elements = excalidrawAPI.getSceneElements()
            const appState = excalidrawAPI.getAppState()

            const saveData = {
                elements,
                appState: {
                    viewBackgroundColor: appState.viewBackgroundColor,
                    gridSize: appState.gridSize,
                },
                notes: markdownText,
                timestamp: new Date().toISOString(),
            }

            localStorage.setItem('blackboard-excalidraw', JSON.stringify(saveData))
            alert('Saved to browser storage!')
        } catch (error) {
            console.error('Failed to save:', error)
            alert('Failed to save')
        }
    }, [excalidrawAPI, markdownText])

    // Load from localStorage
    const loadFromLocal = useCallback(() => {
        if (!excalidrawAPI) return

        try {
            const savedData = localStorage.getItem('blackboard-excalidraw')
            if (!savedData) {
                alert('No saved data found')
                return
            }

            const data = JSON.parse(savedData)

            excalidrawAPI.updateScene({
                elements: data.elements,
                appState: data.appState,
            })

            if (data.notes) {
                setMarkdownText(data.notes)
            }

            alert('Loaded from browser storage!')
        } catch (error) {
            console.error('Failed to load:', error)
            alert('Failed to load')
        }
    }, [excalidrawAPI])

    // Export as JSON
    const exportCanvas = useCallback(() => {
        if (!excalidrawAPI) return

        try {
            const elements = excalidrawAPI.getSceneElements()
            const appState = excalidrawAPI.getAppState()

            const exportData = {
                type: 'excalidraw',
                version: 2,
                source: 'blackboard',
                elements,
                appState: {
                    viewBackgroundColor: appState.viewBackgroundColor,
                    gridSize: appState.gridSize,
                },
                notes: markdownText,
                timestamp: new Date().toISOString(),
            }

            const dataStr = JSON.stringify(exportData, null, 2)
            const dataBlob = new Blob([dataStr], { type: 'application/json' })
            const url = URL.createObjectURL(dataBlob)
            const link = document.createElement('a')
            link.href = url
            link.download = `blackboard-${Date.now()}.excalidraw`
            link.click()
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Failed to export:', error)
            alert('Failed to export')
        }
    }, [excalidrawAPI, markdownText])

    // Import from JSON
    const importCanvas = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file || !excalidrawAPI) return

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string)

                excalidrawAPI.updateScene({
                    elements: data.elements || [],
                    appState: data.appState || {},
                })

                if (data.notes) {
                    setMarkdownText(data.notes)
                }

                alert('Successfully imported!')
            } catch (error) {
                console.error('Failed to import:', error)
                alert('Failed to import file')
            }
        }
        reader.readAsText(file)

        // Reset input
        event.target.value = ''
    }, [excalidrawAPI])

    // Clear canvas
    const clearCanvas = useCallback(() => {
        if (!excalidrawAPI) return
        if (confirm('Are you sure you want to clear the canvas?')) {
            excalidrawAPI.updateScene({
                elements: [],
            })
        }
    }, [excalidrawAPI])

    return (
        <div className="h-screen w-full flex flex-col bg-background">
            {/* Header */}
            <div className="border-b px-4 py-3 flex items-center justify-between bg-card">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsPanelOpen(!isPanelOpen)}
                        title={isPanelOpen ? 'Hide panel' : 'Show panel'}
                    >
                        {isPanelOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
                    </Button>
                    <h1 className="text-xl font-semibold">Blackboard</h1>
                    <span className="text-xs text-muted-foreground">Architecture Diagramming</span>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={saveToLocal} title="Save to browser">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={loadFromLocal} title="Load from browser">
                        <FolderOpen className="h-4 w-4 mr-2" />
                        Load
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button variant="outline" size="sm" onClick={exportCanvas} title="Export as JSON">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button variant="outline" size="sm" asChild title="Import from file">
                        <label className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Import
                            <input
                                type="file"
                                accept=".excalidraw,.json"
                                className="hidden"
                                onChange={importCanvas}
                            />
                        </label>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={clearCanvas} title="Clear canvas">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <PanelGroup direction="horizontal" className="flex-1">
                {/* Left Panel */}
                {isPanelOpen && (
                    <>
                        <Panel defaultSize={25} minSize={20} maxSize={40}>
                            <div className="h-full flex flex-col border-r bg-card max-w-sm">
                                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'write' | 'preview')} className="flex-1 flex flex-col">
                                    <div className="border-b px-4 py-2">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="write">Write</TabsTrigger>
                                            <TabsTrigger value="preview">Preview</TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <TabsContent value="write" className="flex-1 m-0 overflow-hidden">
                                        <Textarea
                                            value={markdownText}
                                            onChange={(e) => setMarkdownText(e.target.value)}
                                            placeholder="Write markdown here..."
                                            className="h-full font-mono text-sm resize-none border-0 focus-visible:ring-0 rounded-none"
                                        />
                                    </TabsContent>

                                    <TabsContent value="preview" className="flex-1 m-0 p-0 overflow-hidden">
                                        <ScrollArea className="h-full">
                                            <div className="p-4 prose prose-sm dark:prose-invert max-w-none">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {markdownText}
                                                </ReactMarkdown>
                                            </div>
                                        </ScrollArea>
                                    </TabsContent>
                                </Tabs>

                                <Separator />

                                {/* Cloud Services */}
                                <ScrollArea className="flex-1 max-h-[50vh]">
                                    <div className="p-4 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-semibold">Cloud Services</h3>
                                            {selectedService && (
                                                <span className="text-xs text-muted-foreground">
                                                    Last: {selectedService}
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            {Object.entries(CLOUD_SERVICES).map(([provider, services]) => (
                                                <div key={provider}>
                                                    <h4 className={`text-xs font-medium mb-2 flex items-center gap-2 ${provider === 'aws' ? 'text-orange-600 dark:text-orange-400' :
                                                        provider === 'azure' ? 'text-blue-600 dark:text-blue-400' :
                                                            'text-indigo-600 dark:text-indigo-400'
                                                        }`}>
                                                        {provider === 'aws' ? '☁️ AWS' : provider === 'azure' ? '🔷 Azure' : '⎈ Kubernetes'}
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-1">
                                                        {services.map((service) => (
                                                            <Button
                                                                key={service.name}
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => addCloudService(service.name, service.icon, service.color)}
                                                                className={`text-xs h-auto py-2 flex flex-col items-start justify-start ${provider === 'aws' ? 'hover:bg-orange-50 dark:hover:bg-orange-950' :
                                                                    provider === 'azure' ? 'hover:bg-blue-50 dark:hover:bg-blue-950' :
                                                                        'hover:bg-indigo-50 dark:hover:bg-indigo-950'
                                                                    }`}
                                                                title={service.description}
                                                            >
                                                                <span className="text-base">{service.icon}</span>
                                                                <span className="font-medium">{service.name}</span>
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollArea>
                            </div>
                        </Panel>
                        <PanelResizeHandle className="w-1 bg-border hover:bg-primary/20 transition-colors" />
                    </>
                )}

                {/* Right Panel - Canvas */}
                <Panel>
                    <div className="h-full w-full">
                        <Suspense fallback={
                            <div className="h-full w-full flex items-center justify-center bg-background">
                                <div className="text-center space-y-2">
                                    <div className="text-2xl">⏳</div>
                                    <p className="text-sm text-muted-foreground">Loading canvas...</p>
                                </div>
                            </div>
                        }>
                            <Excalidraw
                                excalidrawAPI={(api) => setExcalidrawAPI(api)}
                                theme={theme}
                                initialData={{
                                }}
                            />
                        </Suspense>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    )
}