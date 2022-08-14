import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import PatronIdCard from '../components/PatronIdCard'
import { baseColors, Metrics } from '../themes'
import { motion } from 'framer-motion'
import { usePatrons } from '../graphql/queries/usePatrons'

/** update all alcohol levels
 * by refetching patrons every minute
 */
const refetchInterval = 60000
const updateAlcoholLevels = (refetch: any) => {
  setTimeout(() => {
    refetch()
    updateAlcoholLevels(refetch)
  }, refetchInterval)
}

const MainContainer = () => {
  const { data: patrons, loading, refetch } = usePatrons()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  useEffect(() => {
    setTimeout(() => {
      refetch()
      updateAlcoholLevels(refetch)
    }, refetchInterval)
  }, [])

  console.log('selectedIndex', selectedIndex)
  return (
    <>
      <div
        className='main-container'
        style={{
          width: '100%',
          height: '100vh',
          background: baseColors.background,
          position: 'relative'
        }}
      >
        <Header />
        {selectedIndex && (
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#00000077',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => setSelectedIndex(null)}
          >
            <AnimatePresence>
              {selectedIndex && (
                <motion.div
                  layoutId={selectedIndex + ''}
                  key={selectedIndex}
                  style={{ minWidth: '50vw' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <PatronIdCard
                    key={selectedIndex}
                    patron={patrons[selectedIndex - 1]}
                    expanded={true}
                    handleClose={() => setSelectedIndex(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        <div
          style={{
            width: '100vw',
            display: 'grid',
            gap: Metrics.base * 2,
            gridTemplateColumns: 'auto auto auto',
            padding: Metrics.base * 2
          }}
        >
          {patrons.map((patron, index) => (
            <motion.div
              layoutId={index + 1 + ''}
              key={index + 1}
              onClick={() => setSelectedIndex(index + 1)}
              style={{ cursor: 'pointer' }}
            >
              <PatronIdCard
                key={selectedIndex}
                patron={patron}
                expanded={false}
                handleClose={() => setSelectedIndex(null)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MainContainer
