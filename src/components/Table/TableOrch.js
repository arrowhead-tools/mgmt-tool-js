import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] <= a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] <= b[orderBy] ? -1 : 1)
}

class OrchTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy, columnData} = this.props

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}  
                sortDirection={orderBy === column.id ? order : false}
                style={{padding: "1px 1px 1px 1px", textAlign: "center"}}
              >
                <Tooltip
                  title='Sort'
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

OrchTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  columnData: PropTypes.array.isRequired
 }

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  tableCell: {
    lineHeight: "1.42857143",
    padding: "1px 1px 1px 1px" ,
    verticalAlign: "middle",
    textAlign: "center"
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

class OrchTable extends React.Component {
  constructor(props) {
    super(props)

    const { data } = this.props

    this.state = {
      order: 'asc',
      orderBy: 'serviceId',
      data,
      page: 0,
      rowsPerPage: 5
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { classes, columnData } = this.props
    const { data, order, orderBy, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby='tableTitle' >
            <OrchTableHead
              columnData={columnData}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      hover
                      key={n.serviceId + n.systemId}
                    >
                      <TableCell className={classes.tableCell} >{n.serviceId}</TableCell>
                      <TableCell className={classes.tableCell}>{n.serviceDef}</TableCell>
                      <TableCell className={classes.tableCell}>{n.systemId}</TableCell>
                      <TableCell className={classes.tableCell}>{n.systemName}</TableCell>
                      <TableCell className={classes.tableCell}>{n.localCloud}</TableCell>
                    </TableRow>
                  )
                })}
                {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          </div>
        <TablePagination
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
        />
    </Paper>

        
    )
  }
}

OrchTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  columnData: PropTypes.array.isRequired
}

export default withStyles(styles)(OrchTable)
