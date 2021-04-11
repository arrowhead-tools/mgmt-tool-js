import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
}

class EnhancedTableHead extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy, columnData } = this.props

    return (
      <TableHead>
        <TableRow>
          {columnData.map((column) => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
                style={{ padding: '5px 5px 5px 5px' }}
              >
                <Tooltip
                  title="Sort"
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

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  columnData: PropTypes.array.isRequired
}

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  tableCell: {
    lineHeight: '1.42857143',
    padding: '5px 5px 5px 5px',
    verticalAlign: 'middle',
    textAlign: 'center',
    maxWidth: '0px'
  },
  tableCellAuthInfo: {
    lineHeight: '1.42857143',
    verticalAlign: 'middle',
    padding: '5px 5px 5px 5px',
    textAlign: 'center',
    maxWidth: '0px'
  }
})

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props)

    const { data } = this.props

    this.state = {
      order: 'asc',
      orderBy: 'priority',
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

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render() {
    const { classes, columnData } = this.props
    const { data, order, orderBy, rowsPerPage, page } = this.state

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              columnData={columnData}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                  return (
                    <TableRow hover key={n.service.id + n.priority}>
                      <TableCell className={classes.tableCell}>
                        {n.priority}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {n.id}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {n.systemName}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {n.address}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {n.port}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {n.service.id}
                      </TableCell>
                      <TableCell className={classes.tableCellAuthInfo}>
                        {n.service.serviceDefinition}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {n.service.interfaces.join(', ')}
                      </TableCell>
                      <TableCell className={classes.tableCellAuthInfo}>
                        {n.authenticationInfo}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
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
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  columnData: PropTypes.array.isRequired
}

export default withStyles(styles)(EnhancedTable)
