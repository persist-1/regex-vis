import React from 'react'
import { DownloadIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type ExportFormat = 'svg'

interface ExportDropdownProps {
  onExport: (format: ExportFormat) => void
  disabled?: boolean
  className?: string
}

const ExportDropdown: React.FC<ExportDropdownProps> = ({
  onExport,
  disabled = false,
  className,
}) => {
  const { t } = useTranslation()

  const handleExport = (format: ExportFormat) => {
    onExport(format)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className={className}
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          {t('Export')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('svg')}>
          {t('Export as SVG')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ExportDropdown