import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { PromptState, buildPrompt } from '../stores/prompt'
import { useCollectionStore } from '../stores/collection'
import { useCallback, useState } from 'react'

const columnHelper = createColumnHelper<PromptState & { id: string }>()

function Collection() {
  // TODO: automatically close after 5 seconds
  const [clipboardNotice, clipboardNoticeSet] = useState<string | null>(null)
  const data = useCollectionStore(state => state.prompts)
  const deletePrompt = useCollectionStore(state => state.deletePrompt)

  const columns = [
    columnHelper.accessor('subject', { header: 'Subject' }),
    columnHelper.accessor('details', { header: 'Details & Surroundings' }),
    columnHelper.accessor('style', {
      header: 'Stylizations, Media Type, Artists',
    }),
    columnHelper.accessor('aspectRatio', { header: 'Aspect Ratio' }),
    columnHelper.accessor('optionStyle', { header: 'Style' }),
    columnHelper.accessor('quality', { header: 'Quality' }),
    columnHelper.accessor('options', { header: 'Options' }),
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => (
        <>
          <button className="button" onClick={() => handleCopy(row.original)}>
            Copy
          </button>
          <button
            className="button ml-2 text-sm"
            onClick={() => deletePrompt(row.original.id)}
          >
            Delete
          </button>
        </>
      ),
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleCopy = useCallback((promptObj: PromptState) => {
    const prompt = buildPrompt(promptObj)
    navigator.clipboard.writeText(prompt).then(
      () => {
        clipboardNoticeSet('copied!')
      },
      () => {
        clipboardNoticeSet("couldn't copy")
      },
    )
  }, [])

  return (
    <>
      <div className="container mx-auto my-10">
        <h1>Collection</h1>
      </div>
      <div
        className="card card--compact relative mx-4 overflow-auto"
        style={{ height: 'calc(100vh - 10rem)' }}
      >
        {clipboardNotice && (
          <div className="card card--compact card--popover absolute right-4 top-4">
            {clipboardNotice}
          </div>
        )}
        <table className="table text-xl">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="table__row">
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="table__row">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Collection
