import { 
	TableContainer, 
	TextField, 
	LinearProgress, 
	Table, 
	TableHead, 
	TableRow, 
	TableCell, 
	TableBody,
	Pagination,
} from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ShowChart } from '@mui/icons-material';
import { CryptoState } from '../context/crypto/CryptoContext';

export function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinList = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { coins, loading } = CryptoState();

  const handleSearch = () => {
	return coins.filter((coin) => (
		coin.name.toLowerCase().includes(search) ||
		coin.symbol.toLowerCase().includes(search)
	))
  }

  return (
	<>
	<h1 style={{ marginTop: '20px' }}>Crypto Currencies <ShowChart /></h1>
	<TextField
	fullWidth
	id="fullWidth"
	color="warning"
	label="Search"
	value={null}
	onChange={(e) => setSearch(e.target.value)}
	style={{ marginBottom: 20, marginTop: 20 }}
	/>

	<TableContainer>
		{
			loading ? (
				<LinearProgress style={{ backgroundColor: '#0053ff' }} />
			) : (
				<Table>
					<TableHead style={{ backgroundColor: '#0053ff' }}>
						<TableRow>
							{["Coin Name", "Price (USD)", "24hr Change", "Market Cap"].map((head) => (
								<TableCell
									style={{ 
										color: 'Black',
										fontWeight: '700',
										fontFamily: 'Roboto'
									}}
									key={head}
									align={head === "Coin Name" ? "" : "right"}
								>
									{head}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{handleSearch()
						.slice((page - 1) * 10, (page - 1) * 10 + 10)
						.map(row => {
							const profit = row.price_change_percentage_24h > 0;
							return (
								<TableRow
								component={Link}
								to={`price/${row.id}`}
								key={row.name}
								style={{ 
									backgroundColor: '#272727', 
									cursor: 'pointer', 
									textDecoration: 'none'
								}}
								>
									<TableCell component='th' scope='row'
										style={{
											display: 'flex',
											gap: 15,
										}}
									>
										<img
										src={row?.image}
										alt={row.name}
										height='50'
										style={{ marginBottom: 10 }}
										/>
										<div style={{ display: 'flex', flexDirection: 'column' }}>
											<span style={{ fontSize: '20px', textTransform: 'uppercase' }}>
												{row.symbol}
											</span>
											<span style={{ color: 'darkgrey' }}>
												{row.name}
											</span>
										</div>
									</TableCell>
									<TableCell
									align='right'
									>
									${numberWithCommas(row.current_price.toFixed(2))}
									</TableCell>
									<TableCell
									align='right'
									style={{ color: profit > 0 ? 'rgb(49, 199, 109)' : 'rgb(199 49 49)', fontWeight: '500' }}
									>
										{profit && '+'}
										{row.price_change_percentage_24h.toFixed(2)}%
									</TableCell>
									<TableCell
									align='right'
									>
										${numberWithCommas(row.market_cap.toString())}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			)
		}
	</TableContainer>
	<Pagination
	count={(handleSearch()?.length / 10).toFixed(0)}
	onChange={(_, value) => {
		setPage(value);
		window.scroll(0, 450);
	}}
	style={{ padding: 20, width: '100%', display: 'flex', justifyContent: 'center' }}
	/>
	</>
  )
}

export default CoinList